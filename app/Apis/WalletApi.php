<?php

namespace App\Apis;

use App\Services\WalletService;
use Illuminate\Http\Request;
use Exception;

class WalletApi
{
    protected $walletService = null;
    protected $userId = null;

    public function __construct(Request $request)
    {
        $this->walletService = new WalletService();
        $this->userId = $request->user()->id; // Asumiendo que el middleware de autenticación adjunta el usuario autenticado al objeto de solicitud
    }

    public function index()
    {
        $wallet = $this->walletService->getWalletUserId($this->userId);
        $message = $wallet ? 'Billetera encontrada' : 'Billetera no encontrada';
        return response()->json([
            'wallet' => $wallet ? $wallet : null,
            'message' => $message
        ]);
    }

    public function show($walletId)
    {
        $wallet = $this->walletService->getWallet($walletId);
        $message = $wallet ? 'Billetera encontrada' : 'Billetera no encontrada';
        return response()->json([
            'wallet' => $wallet ? $wallet : null,
            'message' => $message
        ]);
    }

    public function store(Request $request)
    {
        $essential_needs_percentage = 50;
        $discretionary_spending_percentage = 30;
        $savings_percentage = 20;

        $data = [
            'user_id' => $this->userId,
            'essential_needs_percentage' => $essential_needs_percentage,
            'discretionary_spending_percentage' => $discretionary_spending_percentage,
            'savings_percentage' => $savings_percentage,
        ];

        try {
            $wallet = $this->walletService->createWallet($data);
            $message = $wallet ? 'Billetera creada exitosamente' : 'Error al crear la billetera';
            return response()->json([
                'wallet' => $wallet ? $wallet : null,
                'message' => $message
            ]);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error al crear la billetera: ' . $e->getMessage()
            ], 500);
        }
    }
}
