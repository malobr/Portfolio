<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        // Standard check
        if (!Auth::validate($credentials)) {
            \Log::warning("Login validation failed for {$request->email}");
            return response()->json(['errors' => ['email' => 'Credenciais inválidas.']], 422);
        }

        $user = \App\Models\User::where('email', $request->email)->first();
        \Log::info("Login success for user ID {$user->id}. Generating MFA...");
        
        // Generate MFA Code (Random 6 digits)
        $code = rand(100000, 999999);
        $user->update([
            'two_factor_code' => $code,
            'two_factor_expires_at' => now()->addMinutes(10)
        ]);

        \Log::info("MFA Code for user {$user->id}: {$code}");

        // Simulation: Sending via SMS
        $maskedPhone = $user->phone 
            ? substr($user->phone, 0, 5) . ' *****-' . substr($user->phone, -4)
            : 'número não cadastrado';

        return response()->json([
            'mfa_required' => true,
            'demo_code' => $code, // REMOVE THIS IN PRODUCTION
            'message' => "Código de segurança enviado via SMS para $maskedPhone."
        ]);
    }

    public function verifyMfa(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
            'code' => ['required'],
        ]);

        \Log::info("MFA Verification attempt for {$request->email} with code {$request->code}");

        $user = \App\Models\User::where('email', $request->email)->first();

        if (!$user) {
            \Log::warning("MFA: User not found for {$request->email}");
            return response()->json(['errors' => ['code' => 'Usuário não encontrado.']], 422);
        }

        if ($user->two_factor_code !== $request->code) {
            \Log::warning("MFA: Code mismatch. Expected {$user->two_factor_code}, got {$request->code}");
            return response()->json(['errors' => ['code' => 'Código inválido.']], 422);
        }

        if (now()->gt($user->two_factor_expires_at)) {
            \Log::warning("MFA: Code expired. Expired at {$user->two_factor_expires_at}, now is " . now());
            return response()->json(['errors' => ['code' => 'Código expirado.']], 422);
        }

        Auth::login($user);
        $user->update(['two_factor_code' => null, 'two_factor_expires_at' => null]);
        $request->session()->regenerate();
        
        \Log::info("MFA Success for {$request->email}");
        return response()->json(['user' => $user, 'message' => 'MFA verificado com sucesso.']);
    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json(['message' => 'Logout realizado.']);
    }

    public function check()
    {
        return response()->json([
            'authenticated' => Auth::check(),
            'user' => Auth::user()
        ]);
    }
}
