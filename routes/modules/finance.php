use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Modules\FinanceController;


route::get('finance', [FinanceController::class, 'index'])->name('finance.index');
