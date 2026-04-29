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
        Auth::login($user);
        $request->session()->regenerate();
        
        \Log::info("Login Success for {$request->email}");
        return response()->json(['user' => $user, 'message' => 'Login realizado com sucesso.']);
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
