import UnsplashReact, {
  Base64Uploader,
  withDefaultProps,
} from 'unsplash-react';

const MY_ACCESS_KEY = 'UNSPLASH_KEY_FROM_UNSPLASH';

export default function UnsplashUploader() {
  return (
    <UnsplashReact
      accessKey={MY_ACCESS_KEY}
      Uploader={withDefaultProps(Base64Uploader, { name: 'event[logo]' })}
    />
  );
}
