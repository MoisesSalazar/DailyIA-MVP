<?php

namespace App\Apis;

use App\Services\IncomeService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class IncomeApi
{
    protected $incomeService;
    protected $userId = null;

    public function __construct(Request $request)
    {
        $this->incomeService = new IncomeService();
        $this->userId = $request->user()->id; // Asumiendo que el middleware de autenticación adjunta el usuario autenticado al objeto de solicitud
    }

    public function store(Request $request)
    {
        try {
            $data = $request->all();
            $response = $this->incomeService->createIncome($data);
            return response()->json([
                'data' => $response,
                'message' => 'Categoria creada satisfactoriamente.'
            ]);
        } catch (\Exception $e) {
            Log::error('Error creating income: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error creando ingreso.' . $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $incomeId)
    {
        try {
            $data = $request->all();
            $response = $this->incomeService->updateIncome($data, $incomeId);
            return response()->json([
                'data' => $response,
                'message' => 'Categoria actualizada satisfactoriamente.'
            ]);
        } catch (\Exception $e) {
            Log::error('Error updating income: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error actualizando ingreso.' . $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($incomeId)
    {
        try {
            $response = $this->incomeService->deleteIncome($incomeId);
            return response()->json([
                'data' => $response,
                'message' => 'Categoria eliminada satisfactoriamente.'
            ]);
        } catch (\Exception $e) {
            Log::error('Error deleting income: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error eliminando ingreso.' . $e->getMessage(),
            ], 500);
        }
    }
}
