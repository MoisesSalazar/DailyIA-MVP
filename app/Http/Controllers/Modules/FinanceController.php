<?php

namespace App\Http\Controllers\Modules;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FinanceController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        // Revoca todos los tokens anteriores del usuario
        $user->tokens()->delete();

        // Crea un nuevo token
        $token = $user->createToken('authToken')->plainTextToken;

        return Inertia::render('Modules/Finance/Index', [
            'authToken' => $token,
        ]);
    }
}
