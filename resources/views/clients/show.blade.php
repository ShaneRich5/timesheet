@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ $client->name }}</div>

                <div class="card-body">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="d-flex">
                                <i class="material-icons p-1">email</i>
                                <p class="p-1">{{ $client->email }}</p>
                            </div>
                            <div class="d-flex">
                                <i class="material-icons p-1">phone</i>
                                <p class="p-1">{{ $client->phone }}</p>
                            </div>
                            <div class="d-flex">
                                <i class="material-icons p-1">location_city</i>
                                <p class="p-1">{{ $client->address }}</p>
                            </div>
                        </div>
                        <div class="col-md-8">
                            <div>{{ $client->description ?? 'No description' }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
