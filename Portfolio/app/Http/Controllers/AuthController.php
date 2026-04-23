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
            return response()->json(['errors' => ['email' => 'Credenciais inválidas.']], 422);
        }

        $user = \App\Models\User::where('email', $request->email)->first();
        
        // Generate MFA Code (Random 6 digits)
        $code = rand(100000, 999999);
        $user->update([
            'two_factor_code' => $code,
            'two_factor_expires_at' => now()->addMinutes(10)
        ]);

        // Simulating sending email... for now we return it in the response for demo purposes
        // In production, this would be sent via Email/SMS
        return response()->json([
            'mfa_required' => true,
            'demo_code' => $code, // REMOVE THIS IN PRODUCTION
            'message' => 'Código de segurança enviado ao seu e-mail.'
        ]);
    }

    public function verifyMfa(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
            'code' => ['required'],
        ]);

        $user = \App\Models\User::where('email', $request->email)
            ->where('two_factor_code', $request->code)
            ->where('two_factor_expires_at', '>', now())
            ->first();

        if ($user) {
            Auth::login($user);
            $user->update(['two_factor_code' => null, 'two_factor_expires_at' => null]);
            $request->session()->regenerate();
            return response()->json(['user' => $user, 'message' => 'MFA verificado com sucesso.']);
        }

        return response()->json(['errors' => ['code' => 'Código inválido ou expirado.']], 422);
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
