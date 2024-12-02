<?php

namespace App\Repositories;

use App\Models\Income;

class IncomeRepository
{
    public function createIncome($data)
    {
        return Income::firstOrCreate(
            ['name' => $data['name'], 'wallet_id' => $data['wallet_id']],
            $data
        );
    }

    public function existsIncome($name, $walletId, $incomeId = 0)
    {
        return Income::where('name', $name)
            ->where('wallet_id', $walletId)
            ->where(function ($query) use ($incomeId) {
                if ($incomeId) {
                    $query->where('id', '!=', $incomeId);
                }
            })
            ->exists();
    }

    public function updateIncome($data, $incomeId)
    {
        Income::where('id', $incomeId)->update($data);
        return Income::find($incomeId);
    }

    public function deleteIncome($incomeId)
    {
        return Income::destroy($incomeId);
    }
}
