<?php

namespace App\Repositories;

use App\Models\Tag;

class TagRepository
{
    public function createTag($data)
    {
        return Tag::create([
            'wallet_id' => $data['wallet_id'],
            'name' => $data['name'],
            'category' => $data['category'],
        ]);
    }

    public function updateTag($tagId, $data)
    {
        $tag = Tag::find($tagId);
        $tag->update([
            'wallet_id' => $data['wallet_id'],
            'name' => $data['name'],
            'category' => $data['category'],
        ]);
        return $tag;
    }

    public function deleteTag($tagId)
    {
        return Tag::destroy($tagId);
    }
}
