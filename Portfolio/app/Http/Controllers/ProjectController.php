<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return \App\Models\Project::where('is_visible', true)->get();
    }

    public function adminIndex()
    {
        return \App\Models\Project::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'slug' => 'required|string|unique:projects',
            'name' => 'required|string',
            'year' => 'required|string',
            'language' => 'required|string',
            'category' => 'required',
            'tagline' => 'required',
            'description' => 'required',
            'role' => 'required',
            'repo_url' => 'required|url',
            'technologies' => 'array',
            'problem' => 'required',
            'solution' => 'required',
            'features' => 'array',
            'is_visible' => 'nullable|boolean'
        ]);

        return \App\Models\Project::create($data);
    }

    public function show(string $id)
    {
        return \App\Models\Project::findOrFail($id);
    }

    public function update(Request $request, string $id)
    {
        $project = \App\Models\Project::findOrFail($id);
        $data = $request->validate([
            'slug' => 'string|unique:projects,slug,'.$id,
            'name' => 'string',
            'year' => 'string',
            'language' => 'string',
            'category' => 'nullable',
            'tagline' => 'nullable',
            'description' => 'nullable',
            'role' => 'nullable',
            'repo_url' => 'url',
            'technologies' => 'array',
            'problem' => 'nullable',
            'solution' => 'nullable',
            'features' => 'array',
            'is_visible' => 'nullable|boolean'
        ]);

        $project->update($data);
        return $project;
    }

    public function destroy(string $id)
    {
        $project = \App\Models\Project::findOrFail($id);
        $project->delete();
        return response()->json(['message' => 'Excluído com sucesso.']);
    }

    public function showBySlug(string $slug)
    {
        return \App\Models\Project::where('slug', $slug)->firstOrFail();
    }
}
