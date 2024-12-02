<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Income extends Model
{
    use SoftDeletes;

    protected $table = 'incomes';

    protected $fillable = [
        'wallet_id',
        'name',
        'month',
        'year',
        'budget',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    protected $keyType = 'string';
    public $incrementing = false;

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $model->id = (string) Str::uuid();
        });
    }
}
