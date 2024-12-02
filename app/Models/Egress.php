<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Egress extends Model
{
    use SoftDeletes;

    protected $table = 'egresses';

    protected $fillable = [
        'wallet_id',
        'tag_id',
        'name',
        'month',
        'year',
        'budget'
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

    public function tag()
    {
        return $this->belongsTo(Tag::class, 'tag_id');
    }
}
