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
                    <div class="list-group list-group-flush">
                        @forelse($clients as $client)
                            <a href="{{ route('clients.show', $client->id) }}" class="list-group-item list-group-item-action flex-column align-items-start">
                                <div class="d-flex w-100 justify-content-between">
                                    <h5 class="mb-1">{{ $client->name }}</h5>
                                    <small>{{ $client->created_at->diffForHumans() }}</small>
                                </div>
                                <div class="d-flex w-100 justify-content-between">
                                    <p class="mb-1">{{ $client->description ?? 'No description' }}</p>
                                    <small>
                                        Managed by {{ $client->createdBy->full_name }}
                                    </small>
                                </div>
                            </a>
                        @empty
                            <p>No clients</p>
                        @endforelse
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
