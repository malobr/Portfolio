<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LiveProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return \App\Models\LiveProject::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'slug' => 'required|string|unique:live_projects',
            'name' => 'required|string',
            'client' => 'required|string',
            'tagline' => 'required',
            'description' => 'required',
            'year' => 'required|string',
            'role' => 'required',
            'category' => 'required',
            'live_url' => 'required|url',
            'repo_url' => 'nullable|url',
            'technologies' => 'array',
            'problem' => 'required',
            'solution' => 'required',
            'features' => 'array',
            'results' => 'array'
        ]);

        return \App\Models\LiveProject::create($data);
    }

    public function show(string $id)
    {
        return \App\Models\LiveProject::findOrFail($id);
    }

    public function update(Request $request, string $id)
    {
        $project = \App\Models\LiveProject::findOrFail($id);
        $data = $request->validate([
            'slug' => 'string|unique:live_projects,slug,'.$id,
            'name' => 'string',
            'client' => 'string',
            'tagline' => 'nullable',
            'description' => 'nullable',
            'year' => 'string',
            'role' => 'nullable',
            'category' => 'nullable',
            'live_url' => 'url',
            'repo_url' => 'nullable|url',
            'technologies' => 'array',
            'problem' => 'nullable',
            'solution' => 'nullable',
            'features' => 'array',
            'results' => 'array'
        ]);

        $project->update($data);
        return $project;
    }

    public function destroy(string $id)
    {
        $project = \App\Models\LiveProject::findOrFail($id);
        $project->delete();
        return response()->json(['message' => 'Excluído com sucesso.']);
    }

    public function showBySlug(string $slug)
    {
        return \App\Models\LiveProject::where('slug', $slug)->firstOrFail();
    }
}
