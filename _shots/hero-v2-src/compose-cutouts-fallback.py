# Composes the full-bleed hero image from the three cutouts on the page ivory (--pl-bg #F3EFE7).
# Output = ONE swappable asset per breakpoint. Prints head anchors for the captions.
import sys, json
from PIL import Image, ImageFilter, ImageDraw
A='/home/user/productlab-site/assets/'
BG=(0xF3,0xEF,0xE7); LIGHT=(0xFB,0xF9,0xF4); INK=(0x16,0x13,0x1C)
cut={n:Image.open(A+f'hero-cast-{n}.webp').convert('RGBA') for n in ['architect','strategist','designer']}

def radial(size, cx, cy, rx, ry, col, alpha):
    W,H=size
    m=Image.new('L',(W,H),0); d=ImageDraw.Draw(m)
    d.ellipse([cx-rx,cy-ry,cx+rx,cy+ry],fill=alpha)
    m=m.filter(ImageFilter.GaussianBlur(max(rx,ry)*0.45))
    layer=Image.new('RGBA',(W,H),col+(0,)); layer.putalpha(m)
    return layer

def build(W,H,places,out,shadow_k=1.0):
    im=Image.new('RGBA',(W,H),BG+(255,))
    # key light behind the cast
    for p in places:
        c=cut[p['n']]; p['w']=round(c.width*p['h']/c.height)
    xs=[p['x']+p['w']/2 for p in places]; cx=sum(xs)/len(xs)
    im.alpha_composite(radial((W,H),cx,H*0.42,W*0.26,H*0.55,LIGHT,255))
    anchors={}
    # back-to-front by z
    for p in sorted(places,key=lambda p:p['z']):
        c=cut[p['n']]; h=p['h']; w=round(c.width*h/c.height)
        s=c.resize((w,h),Image.LANCZOS)
        x=round(p['x']); y=H-h-round(p['lift'])
        # contact shadow
        sh=radial((W,H),x+w/2,y+h-8,w*0.42*shadow_k,h*0.045,INK,int(70*shadow_k))
        im.alpha_composite(sh)
        im.alpha_composite(s,(x,y))
        # head anchor = top-center of cutout
        anchors[p['n']]={'x':(x+w*p.get('hx',0.5))/W,'top':y/H,'w':w/W,'h':h/H}
        p['w']=w
    im.convert('RGB').save(out,quality=88,method=6)
    return anchors

if sys.argv[1]=='desktop':
    W,H=2800,1400
    places=[
      {'n':'designer','h':int(H*0.60),'x':W*0.0,'lift':-6,'z':0,'hx':0.5},
      {'n':'strategist','h':int(H*0.58),'x':W*0.125,'lift':-10,'z':2,'hx':0.47},
      {'n':'architect','h':int(H*0.50),'x':W*0.29,'lift':-8,'z':1,'hx':0.42},
    ]
    a=build(W,H,places,A+'hero-v2-desktop.webp')
    print(json.dumps({'W':W,'H':H,'anchors':a},indent=1))
else:
    W,H=1080,2400
    places=[
      {'n':'designer','h':int(W*0.72),'x':W*-0.01,'lift':-4,'z':0,'hx':0.5},
      {'n':'strategist','h':int(W*0.70),'x':W*0.19,'lift':-8,'z':2,'hx':0.47},
      {'n':'architect','h':int(W*0.60),'x':W*0.40,'lift':-6,'z':1,'hx':0.42},
    ]
    a=build(W,H,places,A+'hero-v2-mobile.webp',0.9)
    print(json.dumps({'W':W,'H':H,'anchors':a},indent=1))
