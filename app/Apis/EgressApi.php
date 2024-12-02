<?php

namespace App\Apis;

use App\Services\EgressService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class EgressApi
{
    protected $egressService;
    protected $userId = null;

    public function __construct(Request $request)
    {
        $this->egressService = new EgressService();
        $this->userId = $request->user()->id; // Asumiendo que el middleware de autenticación adjunta el usuario autenticado al objeto de solicitud
    }

    public function store(Request $request)
    {
        try {
            $data = $request->all();
            $response = $this->egressService->createEgress($data);
            return response()->json([
                'data' => $response,
                'message' => 'Egreso creado satisfactoriamente.'
            ]);
        } catch (\Exception $e) {
            Log::error('Error creando egreso: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error creando egreso: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $egressId)
    {
        try {
            $data = $request->all();
            $response = $this->egressService->updateEgress($data, $egressId);
            return response()->json([
                'data' => $response,
                'message' => 'Egreso actualizado satisfactoriamente.'
            ]);
        } catch (\Exception $e) {
            Log::error('Error actualizando egreso: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error actualizando egreso: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($egressId)
    {
        try {
            $this->egressService->deleteEgress($egressId);
            return response()->json([
                'message' => 'Egreso eliminado satisfactoriamente.'
            ]);
        } catch (\Exception $e) {
            Log::error('Error eliminando egreso: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error eliminando egreso: ' . $e->getMessage(),
            ], 500);
        }
    }
}
