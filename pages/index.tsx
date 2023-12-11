import React, { FC, useEffect } from "react";
import { useRouter } from "next/router";

const Index: FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/auth/login');
  }, []);

  return (
      <>

      </>
  );
};

export default Index;

