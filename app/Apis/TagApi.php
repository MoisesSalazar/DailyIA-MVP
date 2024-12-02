<?php

namespace App\Apis;

use App\Services\TagService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TagApi
{
    protected $tagService;

    public function __construct()
    {
        $this->tagService = new TagService();
    }

    public function store(Request $request)
    {
        try {
            $data = $request->all();
            $response = $this->tagService->createTag($data);
            return response()->json([
                'data' => $response,
                'message' => 'Tag creado satisfactoriamente.'
            ]);
        } catch (\Exception $e) {
            Log::error('Error creando tag: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error creando tag: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $tagId)
    {
        try {
            $data = $request->all();
            $response = $this->tagService->updateTag($tagId, $data);
            return response()->json([
                'data' => $response,
                'message' => 'Tag actualizado satisfactoriamente.'
            ]);
        } catch (\Exception $e) {
            Log::error('Error actualizando tag: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error actualizando tag: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($tagId)
    {
        try {
            $response = $this->tagService->deleteTag($tagId);
            return response()->json([
                'data' => $response,
                'message' => 'Tag eliminado satisfactoriamente.'
            ]);
        } catch (\Exception $e) {
            Log::error('Error eliminando tag: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error eliminando tag: ' . $e->getMessage(),
            ], 500);
        }
    }
}
