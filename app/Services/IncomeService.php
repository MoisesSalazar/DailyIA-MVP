<?php

namespace App\Services;

use App\Repositories\IncomeRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Exception;

class IncomeService
{
    protected $incomeRepository;

    public function __construct()
    {
        $this->incomeRepository = new IncomeRepository();
    }

    public function createIncome($data)
    {
        // Asignar valores de month, year y budget basados en la fecha actual
        $currentDate = now();
        $data['month'] = $currentDate->month;
        $data['year'] = $currentDate->year;

        // Validar los datos
        $validator = Validator::make($data, [
            'wallet_id' => 'required|string',
            'name' => 'required|string|max:255',
            'month' => 'required|integer|between:1,12',
            'year' => 'required|integer|min:1900|max:' . date('Y'),
            'budget' => 'required|numeric|min:0'
        ]);

        if ($validator->fails()) {
            throw new Exception($validator->errors()->first());
        }

        if ($this->incomeRepository->existsIncome($data['name'], $data['wallet_id'])) {
            throw new Exception('Ya existe un ingreso con el mismo nombre en la billetera.');
        }

        DB::beginTransaction();
        try {
            $income = $this->incomeRepository->createIncome($data);
            DB::commit();
            return $income;
        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception('Error creando ingreso: ' . $e->getMessage());
        }
    }

    public function updateIncome($data, $incomeId)
    {
        // Validar los datos
        $validator = Validator::make($data, [
            'name' => 'required|string|max:255',
            'month' => 'required|integer|between:1,12',
            'year' => 'required|integer|min:1900|max:' . date('Y'),
            'budget' => 'required|numeric|min:0'
        ]);

        if ($validator->fails()) {
            throw new Exception($validator->errors()->first());
        }

        if ($this->incomeRepository->existsIncome($data['name'], $data['wallet_id'], $incomeId)) {
            throw new Exception('Ya existe un ingreso con el mismo nombre en la billetera.');
        }

        DB::beginTransaction();
        try {
            $response = $this->incomeRepository->updateIncome($data, $incomeId);
            DB::commit();
            return $response;
        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception('Error actualizando ingreso: ' . $e->getMessage());
        }
    }

    public function deleteIncome($incomeId)
    {
        DB::beginTransaction();
        try {
            $response = $this->incomeRepository->deleteIncome($incomeId);
            DB::commit();
            return $response;
        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception('Error eliminando ingreso: ' . $e->getMessage());
        }
    }
}
