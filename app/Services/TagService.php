<?php

namespace App\Services;

use App\Repositories\TagRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class TagService
{
    protected $tagRepository;

    public function __construct()
    {
        $this->tagRepository = new TagRepository();
    }

    public function createTag($data)
    {
        $validator = Validator::make($data, [
            'wallet_id' => 'required|string',
            'name' => 'required|string|max:255',
            'category' => 'required|in:essential_needs,discretionary_spending,savings',
        ]);

        if ($validator->fails()) {
            throw new \Exception($validator->errors()->first());
        }

        DB::beginTransaction();
        try {
            $tag = $this->tagRepository->createTag($data);
            DB::commit();
            return $tag;
        } catch (\Exception $e) {
            DB::rollBack();
            throw new \Exception('Error creating tag: ' . $e->getMessage());
        }
    }

    public function updateTag($tagId, $data)
    {
        $validator = Validator::make($data, [
            'wallet_id' => 'required|string',
            'name' => 'required|string|max:255',
            'category' => 'required|in:essential_needs,discretionary_spending,savings',
        ]);

        if ($validator->fails()) {
            throw new \Exception($validator->errors()->first());
        }

        DB::beginTransaction();
        try {
            $tag = $this->tagRepository->updateTag($tagId, $data);
            DB::commit();
            return $tag;
        } catch (\Exception $e) {
            DB::rollBack();
            throw new \Exception('Error updating tag: ' . $e->getMessage());
        }
    }

    public function deleteTag($tagId)
    {
        DB::beginTransaction();
        try {
            $tag = $this->tagRepository->deleteTag($tagId);
            DB::commit();
            return $tag;
        } catch (\Exception $e) {
            DB::rollBack();
            throw new \Exception('Error deleting tag: ' . $e->getMessage());
        }
    }
}
