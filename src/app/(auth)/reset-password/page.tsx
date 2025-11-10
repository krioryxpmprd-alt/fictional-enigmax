import { Suspense } from 'react';
import ResetPasswordContent from './ResetPasswordContent';

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f5f5] to-[#f2adc8]/20 px-4">
        <div className="w-full max-w-md p-8 bg-white border-0 shadow-2xl rounded-lg">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 bg-gradient-to-br from-[#f2adc8] to-[#f4c2c2] rounded-2xl flex items-center justify-center">
                <div className="h-8 w-8 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-[#2b2d2f] mb-2">Loading...</h1>
            <p className="text-gray-600">Please wait while we verify your reset token</p>
          </div>
        </div>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}