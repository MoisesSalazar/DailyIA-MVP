<?php

namespace App\Services;

use App\Repositories\WalletRepository;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Exception;

class WalletService
{
    protected $walletRepository = null;

    public function __construct()
    {
        $this->walletRepository = new WalletRepository();
    }

    public function getWalletUserId($userId)
    {
        return $this->walletRepository->getWalletUserId($userId);
    }

    public function getWallet($walletId)
    {
        return $this->walletRepository->getWallet($walletId);
    }

    public function createWallet($data)
    {
        // Validar los datos
        $validator = Validator::make($data, [
            'user_id' => 'required|integer|exists:users,id',
            'essential_needs_percentage' => 'required|integer|min:0|max:100',
            'discretionary_spending_percentage' => 'required|integer|min:0|max:100',
            'savings_percentage' => 'required|integer|min:0|max:100',
        ]);

        if ($validator->fails()) {
            throw new Exception('Validation failed: ' . implode(', ', $validator->errors()->all()));
        }

        // Iniciar la transacción
        DB::beginTransaction();

        try {
            $wallet = $this->walletRepository->createWallet($data);

            // Confirmar la transacción
            DB::commit();

            return $wallet;
        } catch (Exception $e) {
            // Revertir la transacción en caso de error
            DB::rollBack();
            throw new Exception('Error creating wallet: ' . $e->getMessage());
        }
    }
}
