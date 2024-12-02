<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Wallet extends Model
{
    use SoftDeletes;

    protected $table = 'wallets';
    protected $fillable = [
        'user_id',
        'essential_needs_percentage',
        'discretionary_spending_percentage',
        'savings_percentage',
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

    public function incomes()
    {
        return $this->hasMany(Income::class);
    }

    public function egresses()
    {
        return $this->hasMany(Egress::class);
    }

    public function tags()
    {
        return $this->hasMany(Tag::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
}
