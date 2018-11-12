@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Edit Client</div>

                    <div class="card-body">
                        <form method="POST" action="{{ route('clients.update', $client->id) }}">
                            @include('clients.form')
                            {{ method_field('PUT') }}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

@endsection
