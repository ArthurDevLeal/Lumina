import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "./button";

export default function ErrorMessage({ error, isLoading }: { error?: string; isLoading: boolean }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertCircle className="text-destructive " size={38} />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Oops! Something went wrong</h2>
          <p className="text-sm text-muted-foreground">We couldn't load your dashboard data</p>
        </div>

        <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
          <p className="text-sm text-destructive font-medium">{error}</p>
        </div>

        {/* Actions */}
        <Button>
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Retrying...
            </>
          ) : (
            <>
              <RefreshCcw size={16} />
              Try Again
            </>
          )}
        </Button>

        {/* Help Text */}
        <p className="text-xs text-muted-foreground">
          If the problem persists, please contact support <br />
          or try logging out and back in.
        </p>
      </div>
    </div>
  );
}
