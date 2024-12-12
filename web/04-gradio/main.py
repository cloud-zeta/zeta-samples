import argparse
import gradio as gr


def generate_image():
    iframehtml = f'''
        <iframe id="city-viewer-iframe"
                src="https://cloudzeta.com/player/lt3k51km833tfl3d"
                width="100%"
                height="500px"
                style="border:none;"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen="true"
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-popups">
        </iframe>
        <button onclick="document.getElementById('city-viewer-iframe').src = document.getElementById('city-viewer-iframe').src"
                style="padding: 10px 20px; background-color: #008CBA; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 10px;">
            Refresh 3D View
        </button>
    '''
    return iframehtml

with gr.Blocks() as demo:
    with gr.Column():

        iframe_html = gr.HTML(visible=True)

        with gr.Row():
            generate_image_btn = gr.Button("Load Iframe")

            generate_image_btn.click(
                fn=generate_image,
                inputs=[],
                outputs=[iframe_html]
            )

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    # If the option python ui.py --share is attached, it will be deployed to Gradio
    parser.add_argument("--share", action="store_true", help="Deploy on Gradio for sharing", default=False)
    args = parser.parse_args()
    demo.launch(
        share=args.share,
        server_name="0.0.0.0",
        server_port=7860,
    )
