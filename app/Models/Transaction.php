<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;
use Carbon\Carbon;

class Transaction extends Model
{
    use SoftDeletes;

    protected $table = 'transactions';

    protected $fillable = [
        'wallet_id',
        'type',
        'egress_id',
        'income_id',
        'amount',
        'tag_id',
        'concept'
    ];

    protected $keyType = 'string';
    public $incrementing = false;

    protected $appends = ['type_spanish', 'category', 'created_at_formatted', 'updated_at_formatted']; // Asegúrate de que los accesorios se incluyan en las representaciones JSON

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $model->id = (string) Str::uuid();
        });
    }

    public function tag()
    {
        return $this->belongsTo(Tag::class, 'tag_id');
    }

    public function egress()
    {
        return $this->belongsTo(Egress::class, 'egress_id');
    }

    public function income()
    {
        return $this->belongsTo(Income::class, 'income_id');
    }

    // Nueva función para devolver el tipo en español
    public function getTypeInSpanish()
    {
        $types = [
            'income' => 'Ingreso',
            'egress' => 'Egreso'
        ];

        return $types[$this->type] ?? $this->type;
    }

    // Accesor para el tipo en español
    public function getTypeSpanishAttribute()
    {
        return $this->getTypeInSpanish();
    }

    // Accesor para la categoría
    public function getCategoryAttribute()
    {
        if ($this->type === 'income' && $this->income) {
            return $this->income->name;
        } elseif ($this->type === 'egress' && $this->egress) {
            return $this->egress->name;
        }
        return null;
    }

    // Accesor para la fecha de creación formateada
    public function getCreatedAtFormattedAttribute()
    {
        return Carbon::parse($this->created_at)->format('d M Y H:i');
    }

    // Accesor para la fecha de actualización formateada
    public function getUpdatedAtFormattedAttribute()
    {
        return Carbon::parse($this->updated_at)->format('d M Y H:i');
    }
}