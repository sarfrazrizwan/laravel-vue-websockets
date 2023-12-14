<?php

namespace App\Http\Controllers;

use App\Http\Resources\NotificationResource;
use App\Models\User;
use App\Notifications\NewNotification;
use Illuminate\Http\Request;

class MainController extends Controller
{
    public function home()
    {
        return inertia('Home');
    }

    public function quotations()
    {
        return inertia('Quotations/Index');
    }

    public function products()
    {
        return inertia('Products/Index');
    }

    public function selectCompany()
    {
        return inertia('CompanySelection');
    }

    public function updateCompanySelection($id)
    {
        auth()->user()->update(['company_id' => $id]);
        return redirect()->route('home');
    }
    public function test()
    {
        $user = User::find(1);
        $user->notify(new NewNotification());
    }
}
