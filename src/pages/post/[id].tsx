import { useRouter } from "next/dist/client/router";
import React from "react";

const PostPage = (id: number) => {
  const router = useRouter();

  console.log(router.query.id);

  return (
    <div className="index">
      <style jsx>{`
        .index {
          padding: 20px;
        }
      `}</style>
    </div>
  );
};

export default PostPage;
