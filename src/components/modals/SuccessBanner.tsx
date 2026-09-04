import CheckCircle from '@icons/check_circle.svg?react';

export interface SuccessBannerProps {
  title: string;
  message?: string;
  strong?: string;
}

const SuccessBanner = ({ title, message, strong }: SuccessBannerProps) => {
  return (
    <div
      id="success_banner"
      className="flex h-50 flex-col justify-evenly rounded-sm border-l-4
        border-border-bold bg-bg-main p-4 text-text-main"
    >
      <div className="flex items-center space-x-2">
        <CheckCircle className="size-8" />

        <h5 id='success_title' className="text-3xl font-semibold">{title}</h5>
      </div>

      {message && (
        <p id='success_message' className="text-xl">
          {message}
          {strong && <strong>{strong}</strong>}
        </p>
      )}
    </div>
  );
};
export default SuccessBanner;