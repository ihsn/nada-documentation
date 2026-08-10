<template>
  <div class="nada-map-wrapper">
    <div ref="mapEl" class="nada-map"></div>
    <p class="nada-map-caption">
      Known NADA deployments worldwide.
      <a href="https://github.com/ihsn/nada-documentation/issues" target="_blank">Submit yours →</a>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { instances } from '../../data/instances'

const mapEl = ref<HTMLElement | null>(null)
let map: any = null

onMounted(async () => {
  if (!mapEl.value) return

  const L = (await import('leaflet')).default
  await import('leaflet/dist/leaflet.css')

  // Fix bundler icon path issue
  delete (L.Icon.Default.prototype as any)._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  })

  map = L.map(mapEl.value, { scrollWheelZoom: false }).setView([20, 10], 2)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(map)

  instances.forEach((inst) => {
    L.marker([inst.lat, inst.lng])
      .addTo(map)
      .bindPopup(
        `<strong>${inst.name}</strong><br/><span style="color:#666;font-size:0.85em">${inst.description}</span><br/><a href="${inst.url}" target="_blank" rel="noopener">Visit catalog →</a>`
      )
  })
})

onBeforeUnmount(() => {
  map?.remove()
  map = null
})
</script>

<style scoped>
.nada-map-wrapper {
  margin: 1.5rem 0;
}

.nada-map {
  height: 400px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.nada-map-caption {
  font-size: 0.85em;
  color: var(--vp-c-text-2);
  text-align: center;
  margin-top: 0.5rem;
}
</style>
