import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import AuthorCard from '@/components/About/AuthorCard';
import EditModal from '@/components/About/EditModal';
import { getAuthor, updateAuthor } from '@/services/About/About';

const AboutPage: React.FC = () => {
  const [author, setAuthor] = useState<any>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const data = getAuthor();
    setAuthor(data);
  }, []);

  const handleSubmit = (values: any) => {
    const updated = {
      ...values,
      skills: values.skills.split(',').map((s: string) => s.trim()),
    };

    updateAuthor(updated);
    setAuthor(updated);
    setOpen(false);
    message.success('Cập nhật thành công');
  };

  if (!author) return null;

  return (
    <>
      <AuthorCard data={author} onEdit={() => setOpen(true)} />

      <EditModal
        open={open}
        onCancel={() => setOpen(false)}
        onSubmit={handleSubmit}
        initialValues={{
          ...author,
          skills: author.skills.join(', '),
        }}
      />
    </>
  );
};

export default AboutPage;

