import toast from 'react-hot-toast';

export const toastInfo = () =>
  toast.error(
    'Sorry, there are no images matching your search query. Please try again.'
  );

export const toastInputQuery = () =>
  toast.error('Sorry, please provide a search word');

export const success = query => {
  const idQuery = query.split('/');
  const extractedQuery = idQuery[1];
  toast.success(
    <div>
      I like <b>{extractedQuery}</b> too!
    </div>
  );
};
