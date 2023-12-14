<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\NotificationResource;
use App\Models\User;
use App\Notifications\NewNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use function auth;
use function now;

class NotificationController extends Controller
{
    public function index()
    {
        return NotificationResource::collection(auth()->user()->companyNotifications());
    }

    public function store(Request $request)
    {
        $users = User::where('company_id', auth()->user()->company_id)->where('id', '<>', auth()->id())->get();
        foreach ($users as $user) {
            $user->notify(new NewNotification($request->text));
        }
    }
    public function markAsRead($id)
    {
        DB::table('notifications')->where(['id' => $id])->update(['read_at' => now()]);
        return NotificationResource::collection(auth()->user()->companyNotifications());
    }
    public function markAllRead()
    {
        $user = auth()->user();
        $user->unreadNotifications->markAsRead();
        return NotificationResource::collection($user->companyNotifications());
    }
}

