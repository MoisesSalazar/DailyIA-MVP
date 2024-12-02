<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Tag extends Model
{
    use SoftDeletes;

    protected $table = 'tags';

    protected $fillable = [
        'wallet_id',
        'name',
        'category'
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

    public function egresses()
    {
        return $this->hasMany(Egress::class, 'tag_id');
    }
}
