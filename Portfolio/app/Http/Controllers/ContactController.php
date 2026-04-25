<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function send(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        // In a real scenario, you would send an actual email here:
        // Mail::to('contato@marcelocavalheiro.com')->send(new ContactMail($validated));
        
        // For now, we log the message and return success to confirm it reached the server
        Log::info('New Contact Form Submission:', $validated);

        return response()->json([
            'success' => true,
            'message' => 'Message logged successfully.'
        ]);
    }
}
