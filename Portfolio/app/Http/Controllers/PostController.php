<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {
        return Post::orderBy('created_at', 'desc')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'slug' => 'required|unique:posts',
            'title' => 'required',
            'excerpt' => 'nullable',
            'content' => 'required',
            'publish_date' => 'required',
            'read_time' => 'required',
            'tags' => 'nullable|array'
        ]);

        return Post::create($validated);
    }

    public function show(string $id)
    {
        return Post::findOrFail($id);
    }

    public function update(Request $request, string $id)
    {
        $post = Post::findOrFail($id);
        $validated = $request->validate([
            'slug' => 'required|unique:posts,slug,' . $id,
            'title' => 'required',
            'excerpt' => 'nullable',
            'content' => 'required',
            'publish_date' => 'required',
            'read_time' => 'required',
            'tags' => 'nullable|array'
        ]);

        $post->update($validated);
        return $post;
    }

    public function destroy(string $id)
    {
        $post = Post::findOrFail($id);
        $post->delete();
        return response()->json(['message' => 'Post deleted']);
    }

    public function getBySlug($slug)
    {
        return Post::where('slug', $slug)->firstOrFail();
    }
}
