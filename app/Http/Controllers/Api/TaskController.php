<?php

namespace App\Http\Controllers\Api;

use App\Client;
use App\Task;
use App\User;
use Illuminate\Auth\AuthManager;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class TaskController extends Controller
{
    /**
     * @var Task
     */
    private $task;

    /**
     * @var AuthManager
     */
    private $auth;

    public function __construct(Task $task, Guard $auth)
    {
        $this->task = $task;
        $this->auth = $auth;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = $this->auth->user();
        $tasks = $this->task->where('user_id', $user->id)->with('client')->get();
        return response()->json(['tasks' => $tasks]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        /** @var User $user */
        $user = $this->auth->user();
        $values = array_merge($request->all(), ['user_id' => $user->id]);
        $task = $this->task->create($values);
        $task->load('client');
        return response()->json(['task' => $task]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Task $task)
    {
        $updated = $task->update($request->all());
        $task->load('client');
        return response()->json(['task' => $task]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function destroy(Task $task)
    {
        try {
            $success = $task->delete();
        } catch (\Exception $e) {
            $success = false;
        }

        return response()->json(['success' => $success]);
    }
}
