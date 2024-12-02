<?php

namespace App\Services;

use App\Repositories\TransactionRepository;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class TransactionService
{
    private $transactionRepository;

    public function __construct()
    {
        $this->transactionRepository = new TransactionRepository();
    }

    public function createTransaction($data)
    {
        // Validar los datos
        $validator = Validator::make($data, [
            'wallet_id' => 'required|uuid|exists:wallets,id',
            'type' => 'required|string|in:income,egress',
            'income_id' => 'nullable|uuid|exists:incomes,id',
            'tag_id' => 'nullable|uuid|exists:tags,id',
            'egress_id' => 'nullable|uuid|exists:egresses,id',
            'amount' => 'required|numeric|min:0',
            'concept' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            throw new \Exception($validator->errors()->first());
        }

        DB::beginTransaction();
        try {
            $transaction = $this->transactionRepository->createTransaction($data);
            DB::commit();
            return $transaction;
        } catch (\Exception $e) {
            DB::rollBack();
            throw new \Exception('Error creating transaction: ' . $e->getMessage());
        }
    }
}