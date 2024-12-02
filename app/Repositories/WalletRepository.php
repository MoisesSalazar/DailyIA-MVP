<?php

namespace App\Repositories;

use App\Models\Wallet;

class WalletRepository
{
    public function getWalletUserId($userId)
    {
        return Wallet::with([
            'incomes',
            'tags.egresses',
            'egresses.tag',
            'transactions.tag',
            'transactions.income',
            'transactions.egress',
        ])->where('user_id', $userId)->first();
    }

    public function getWallet($walletId)
    {
        return Wallet::with([
            'incomes',
            'tags.egresses',
            'egresses.tag',
            'transactions.tag',
            'transactions.income',
            'transactions.egress',
        ])->find($walletId);
    }

    public function createWallet($data)
    {
        return Wallet::firstOrCreate(
            ['user_id' => $data['user_id']], // Condición para buscar la billetera existente
            $data // Datos para crear la billetera si no existe
        );
    }
}
