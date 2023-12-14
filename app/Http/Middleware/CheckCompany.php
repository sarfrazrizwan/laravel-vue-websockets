<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckCompany
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if (auth()->check() && !$request->routeIs('company.selection') && !auth()->user()->company_id)
        {
            return  redirect()->route('company.selection');
        }
        return $next($request);
    }
}
