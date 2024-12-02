<?php

namespace App\Services;

use App\Repositories\EgressRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class EgressService
{
    protected $egressRepository;

    public function __construct()
    {
        $this->egressRepository = new EgressRepository();
    }

    public function createEgress($data)
    {
        $validator = Validator::make($data, [
            'wallet_id' => 'required|string',
            'name' => 'required|string|max:255',
            'tag_id' => 'required|string',
            'month' => 'required|integer',
            'year' => 'required|integer',
            'budget' => 'required|string',
        ]);

        if ($validator->fails()) {
            throw new \Exception($validator->errors()->first());
        }

        DB::beginTransaction();
        try {
            $egress = $this->egressRepository->createEgress($data);
            DB::commit();
            return $egress;
        } catch (\Exception $e) {
            DB::rollBack();
            throw new \Exception('Error creating egress: ' . $e->getMessage());
        }
    }

    public function updateEgress($data, $egressId)
    {
        $validator = Validator::make($data, [
            'wallet_id' => 'required|string',
            'name' => 'required|string|max:255',
            'tag_id' => 'required|string',
            'month' => 'required|integer',
            'year' => 'required|integer',
            'budget' => 'required|string',
        ]);

        if ($validator->fails()) {
            throw new \Exception($validator->errors()->first());
        }

        DB::beginTransaction();
        try {
            $egress = $this->egressRepository->updateEgress($data, $egressId);
            DB::commit();
            return $egress;
        } catch (\Exception $e) {
            DB::rollBack();
            throw new \Exception('Error updating egress: ' . $e->getMessage());
        }
    }

    public function deleteEgress($egressId)
    {
        DB::beginTransaction();
        try {
            $this->egressRepository->deleteEgress($egressId);
            DB::commit();
            return true;
        } catch (\Exception $e) {
            DB::rollBack();
            throw new \Exception('Error deleting egress: ' . $e->getMessage());
        }
    }
}
