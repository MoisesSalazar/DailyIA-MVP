<?php

namespace App\Repositories;

use App\Models\Egress;

class EgressRepository
{
    public function createEgress($data)
    {
        $egress = Egress::create($data);
        return $egress->load('tag'); // Retornar el egreso con la relación 'tag' cargada
    }

    public function updateEgress($data, $egressId)
    {
        $egress = Egress::find($egressId);
        $egress->update($data);
        return $egress->load('tag'); // Retornar el egreso con la relación 'tag' cargada
    }

    public function deleteEgress($egressId)
    {
        $egress = Egress::find($egressId);
        $egress->delete();
    }
}
