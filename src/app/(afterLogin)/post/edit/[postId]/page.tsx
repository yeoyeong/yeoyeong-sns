import EditForm from '@/_features/write/ui/editForm';
import BackButton from '@/_shared/ui/button/BackButton';

export default function EditPage() {
  return (
    <div className='bg-white-100 fixed top-0 z-20 flex h-screen w-full justify-center pt-20'>
      <div className='flex h-[600px] w-[440px] flex-col'>
        <div className='pl-2 pt-4'>
          <BackButton />
        </div>
        <EditForm />
      </div>
    </div>
  );
}