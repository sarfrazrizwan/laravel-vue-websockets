<?php


use App\Http\Controllers\MainController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {

    Route::middleware([ 'verify.company'])->group(function (){

        Route::get('/', [MainController::class, 'home'])->name('home');
        Route::get('/quotations', [MainController::class, 'quotations'])->name('quotations');
        Route::get('/products', [MainController::class, 'products'])->name('products');
    });

    Route::get('/select-company', [MainController::class, 'selectCompany'])->name('company.selection');
    Route::post('/company/{id}', [MainController::class, 'updateCompanySelection'])->name('company.update-selection');
});


