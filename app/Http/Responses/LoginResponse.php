<?php

namespace App\Http\Responses;

use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;

class LoginResponse implements LoginResponseContract
{
    public function toResponse($request): mixed
    {
        $user = $request->user();

        $intended = match ($user->role) {
            'admin' => route('admin.dashboard'),
            default => route('staff.premises.search'),
        };

        return redirect()->intended($intended);
    }
}
