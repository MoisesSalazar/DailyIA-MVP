<?php

namespace App\Repositories;

use App\Models\Transaction;

class TransactionRepository
{
    public function createTransaction($data)
    {
        $transaction = Transaction::create($data);
        
        // Cargar las relaciones necesarias
        $transaction->load(['tag', 'income', 'egress']);
        
        return $transaction;
    }
}