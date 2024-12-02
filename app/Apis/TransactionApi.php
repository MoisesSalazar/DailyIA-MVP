<?php

namespace App\Apis;

use App\Services\TransactionService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TransactionApi
{
    protected $transactionService;
    protected $userId = null;

    public function __construct(Request $request)
    {
        $this->transactionService = new TransactionService();
        $this->userId = $request->user()->id; // Asumiendo que el middleware de autenticación adjunta el usuario autenticado al objeto de solicitud
    }

    public function store(Request $request)
    {
        try {
            $data = $request->all();
            $response = $this->transactionService->createTransaction($data);
            return response()->json([
                'data' => $response,
                'message' => 'Transacción creada satisfactoriamente.'
            ]);
        } catch (\Exception $e) {
            Log::error('Error creando transacción: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error creando transacción: ' . $e->getMessage(),
            ], 500);
        }
    }
}