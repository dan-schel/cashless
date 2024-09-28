import { onMounted, ref } from "vue";

export function useFullscreen() {
  const isFullscreen = ref(false);

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  onMounted(() => {
    isFullscreen.value = document.fullscreenElement != null;
    document.addEventListener("fullscreenchange", () => {
      isFullscreen.value = document.fullscreenElement != null;
    });
  });

  return { isFullscreen, toggleFullscreen };
}
