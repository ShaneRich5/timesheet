@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header" style="display: flex; justify-content: space-between;">
                    Clients
                    <a href="{{ route('clients.create') }}">New</a>
                </div>
                <div class="card-body">
                    <div class="list-group">
                        @forelse($clients as $client)
                            <a href="{{ route('clients.show', $client->id) }}" class="list-group-item list-group-item-action flex-column align-items-start">
                                <div class="d-flex w-100 justify-content-between">
                                    <h5 class="mb-1">{{ $client }}</h5>
                                    <small>3 days ago</small>
                                </div>
                                <p class="mb-1">{{ $client->description ?? 'No description' }}</p>
                                <small>Donec id elit non mi porta.</small>
                            </a>

                            <a href="{{ route('') }}">

                            </a>
                            <li>
                                {{ $client->name }}
                            </li>
                        @empty
                            <li>No clients</li>
                        @endforelse
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
