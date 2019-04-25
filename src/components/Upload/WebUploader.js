import React, { Component } from "react";
import styled from "styled-components";
import { Subscribe } from "unstated";

import api from "../../utils/api";
import subdomain from "../../utils/subdomain";
import AuthContainer from "../../utils/AuthContainer";

import Button from "../Button/Button";
import Login from "../../views/Login/Login";

const endpoint = subdomain
  ? `/api/v2/holes/${subdomain}/grabs`
  : `/api/v2/holes/root/grabs`;

export default class WebUploader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDragOver: false,
      progress: 0,
      uploading: false,
      uploadingFromDrop: false,
    };
  }

  componentDidMount() {
    document.addEventListener("carbon:dragenter", this.onDragEnter);
    document.addEventListener("carbon:dragover", this.onDragOver);
    document.addEventListener("carbon:dragend", this.onDragEnd);
    document.addEventListener("carbon:drop", this.onDrop);
  }

  componentWillUnmount() {
    document.removeEventListener("carbon:dragenter", this.onDragEnter);
    document.removeEventListener("carbon:dragover", this.onDragOver);
    document.removeEventListener("carbon:dragend", this.onDragEnd);
    document.removeEventListener("carbon:drop", this.onDrop);
  }

  uploadFile = async (file, url, token, options) => {
    if (!file) options.onError.apply(this, [null, "no file"]);

    options = options || {};
    // start upload
    const upload = new window.Carbon.Upload(file, {
      url: url,
      method: "PUT",
      authorization: "Bearer " + token,
      chuckSize: 1024 * 1024 * 32,
    });
    if (options.onStart) {
      upload.on("start", e => options.onStart.apply(this, [upload, e]));
    }
    if (options.onProgress) {
      upload.on("progress", e => options.onProgress.apply(this, [upload, e]));
    }
    if (options.onComplete) {
      upload.on("complete", e => options.onComplete.apply(this, [upload, e]));
    }
    if (options.onError) {
      upload.on("error", e => options.onError.apply(this, [upload, e]));
    }
    return upload.start();
  };

  onDragOver = e => {
    this.setState({ isDragOver: true });
  };

  onDragEnd = e => {
    this.setState({ isDragOver: false });
  };

  onDrop = async e => {
    let getUploadToken = await api.post(`/api/v2/upload_tokens`);
    let data = getUploadToken.data;
    const file = e.detail.files[0];

    if (
      getUploadToken.ok ||
      file.size < 10000000 ||
      file.type === "image/png" ||
      file.type === "image/jpg" ||
      file.type === "image/jpeg" ||
      file.type === "video/quicktime" ||
      file.type === "video/mp4"
    ) {
      // Start uploading if everything is ok
      this.uploadFile(file, data.url, data.token, {
        async onStart(upload, e) {
          console.log("start", upload, e);

          this.setState({
            uploading: true,
            uploadingFromDrop: true,
          });
        },
        onProgress(upload, e) {
          const progressValue = Math.round(e.value * 100);
          console.log("progress", e, upload.baseUri, progressValue);

          this.setState({
            progress: progressValue,
          });
        },
        async onComplete(upload, e) {
          console.log("complete", upload, e);

          let uploadGrab = await api.post(endpoint, {
            grab: {
              image_path: upload.result.key,
            },
          });

          if (uploadGrab.ok) {
            this.setState({
              uploading: false,
              uploadingFromDrop: false,
              progress: 0,
            });
          }
        },
        onError(upload, e) {
          console.log("error", upload, e);
          alert("Something went wrong. Check the console.");

          this.setState({
            uploading: false,
            uploadingFromDrop: false,
            progress: 0,
          });
        },
      });
    } else {
      if (file.size > 9999999) {
        alert("Your file is too large! (10 MB max)");
      } else {
        alert("Something went wrong. Check the console.");
        console.warn(data);
      }
    }
  };

  uploadGrab = async e => {
    e.preventDefault();

    let getUploadToken = await api.post(`/api/v2/upload_tokens`);
    let data = getUploadToken.data;
    const file = this.grabUpload.files[0];
    const caption = this.grabCaption.value;

    if (
      (getUploadToken.ok && file.size < 10000000) ||
      file.type === "image/png" ||
      file.type === "image/jpg" ||
      file.type === "image/jpeg" ||
      file.type === "video/quicktime" ||
      file.type === "video/mp4"
    ) {
      // Start uploading if everything is ok
      this.uploadFile(file, data.url, data.token, {
        async onStart(upload, e) {
          console.log("start", upload, e);

          this.setState({
            uploading: true,
          });
        },
        onProgress(upload, e) {
          console.log("progress", e, upload.baseUri, Math.round(e.value * 100));

          this.setState({
            progress: Math.round(e.value * 100),
          });
        },
        async onComplete(upload, e) {
          console.log("complete", upload, e);

          let uploadGrab = await api.post(endpoint, {
            grab: {
              image_path: upload.result.key,
              description: caption,
            },
          });

          if (uploadGrab.ok) {
            this.grabUpload.value = "";
            this.grabCaption.value = "";

            this.setState({
              uploading: false,
              progress: 0,
            });
          }
        },
        onError(upload, e) {
          console.log("error", upload, e);
          alert("Something went wrong. Check the console.");

          this.setState({
            uploading: false,
            progress: 0,
          });
        },
      });
    } else {
      if (file.size > 9999999) {
        alert("Your file is too large! (10 MB max)");
      } else {
        alert("Something went wrong. Check the console.");
        console.warn(data);
      }
    }
  };

  render() {
    return (
      <Subscribe to={[AuthContainer]}>
        {auth => (
          <div>
            <Dropzone isDragOver={this.state.isDragOver}>
              Drop it like it’s hot.
            </Dropzone>
            {this.state.uploadingFromDrop && (
              <DropzoneProgress>
                <ProgressBar progress={this.state.progress} />
              </DropzoneProgress>
            )}
            {auth.state.uploader && (
              <UploadModal>
                {!auth.state.current ? (
                  <Login />
                ) : (
                  <form onSubmit={this.uploadGrab}>
                    <CloseButton onClick={() => auth.toggleUploader("off")}>
                      {closeIcon}
                    </CloseButton>
                    <h3>Post a grab</h3>
                    <p>
                      Upload those juicy <strong>.jpg</strong>,{" "}
                      <strong>.png</strong>, <strong>.gif</strong>,{" "}
                      <strong>.mp4</strong> grabs (max 10MB)
                    </p>
                    <Caption>
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.gif,.png,.mp4"
                        ref={ref => (this.grabUpload = ref)}
                        disabled={this.state.uploading}
                      />
                    </Caption>
                    <Caption>
                      <span>Caption</span>
                      <textarea
                        cols="30"
                        rows="3"
                        ref={ref => (this.grabCaption = ref)}
                        disabled={this.state.uploading}
                      />
                    </Caption>
                    <div className="center-it">
                      <ButtonUpload
                        type="submit"
                        disabled={this.state.uploading}
                      >
                        Upload!
                      </ButtonUpload>
                      {this.state.uploading && (
                        <ProgressBarWrapper>
                          <ProgressBar progress={this.state.progress} />
                        </ProgressBarWrapper>
                      )}
                    </div>
                  </form>
                )}
              </UploadModal>
            )}
          </div>
        )}
      </Subscribe>
    );
  }
}

const UploadModal = styled.div`
  position: fixed;
  top: calc(64px - 0.25rem);
  right: 0;
  height: 100vh;
  width: 100%;
  background-color: black;
  padding: 2rem 3rem;

  @media (min-width: 820px) {
    right: 2.125rem;
    width: 515px;
    height: auto;
    box-shadow: 0 0 0 4px var(--primary-color), 0 4px 15px 0 rgba(0, 0, 0, 0.75);
    border-radius: 6px;
  }
  z-index: 999;
  transition: all 0.4s ease;
  transform-origin: 40% -20%;

  @media (min-width: 820px) {
    &::after {
      content: "";
      position: absolute;
      top: -13px;
      right: 290px;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 7px 10px;
      border-color: transparent transparent #6a40ee;
    }
  }

  h3,
  p {
    text-align: center;
  }

  h3 {
    font-size: 1.75rem;
  }

  p {
    margin: 0.5rem 0;
    color: var(--muted-color);
    font-size: 0.875rem;
  }

  strong {
    font-weight: normal;
    color: var(--primary-color);
  }

  .center-it {
    display: flex;
    justify-content: center;
  }
`;

const CloseButton = styled.button`
  background: none;
  box-shadow: none;
  border: none;
  outline: none;
  color: white;
  position: absolute;
  right: 0.25rem;
  top: 0.5rem;
  transition: 0.15s ease all;

  @media (pointer: fine) {
    &:hover,
    &:focus {
      color: var(--primary-color);
      cursor: pointer;
    }

    &:active {
      transform: scale(0.98);
    }
  }
`;

const Caption = styled.label`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;

  > span {
    color: var(--muted-color);
  }

  textarea {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    padding: 0.75rem;
    margin-top: 0.5rem;
    font-size: 1rem;
    border: none;
    box-shadow: none;
    color: white;
    transition: 0.25s ease all;
    resize: none;

    &:focus {
      box-shadow: 0 0 0 4px black, 0 0 0 6px var(--primary-color);
      outline: none;
    }
  }

  input[type="file"] {
  }
`;

const closeIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1={18} y1={6} x2={6} y2={18} />
    <line x1={6} y1={6} x2={18} y2={18} />
  </svg>
);

const ButtonUpload = styled(Button)`
  margin-top: 1rem;
`;

const ProgressBarWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 48px;
  background-color: var(--body-bg-color);
  transform: translateY(1rem);
  padding: 0 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProgressBar = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 200px;
  width: 100%;
  height: 1rem;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    background: linear-gradient(HSLA(255, 83%, 58%, 1), HSLA(255, 83%, 48%, 1));
    box-shadow: inset 0 1px 0 0 HSLA(255, 83%, 65%, 1);
    width: ${props => props.progress}%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    transition: 0.15s ease width;
  }
`;

const Dropzone = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: HSLA(255, 83%, 58%, 0.98);
  border: 24px dashed HSLA(255, 83%, 40%, 1);
  color: black;
  font-weight: 700;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 5rem;
  z-index: 999999999;
  transition: 0.15s ease all;
  opacity: ${props => (props.isDragOver ? 1 : 0)};
  visibility: ${props => (props.isDragOver ? "visible" : "hidden")};
  pointer-events: ${props => (props.isDragOver ? "all" : "none")};
`;

const DropzoneProgress = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--body-bg-color);
  border-bottom: 1px solid var(--super-muted-color);
  z-index: 99999;
  padding: 0 1rem;
`;
