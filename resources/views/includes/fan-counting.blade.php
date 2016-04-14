<div class="fan-count">
    @for ( $i = 1; $i < count($fansOverview) + 1; $i++)
        @if ( $fan->fan_number == $i)
            <span class="fan-order colored"></span>
        @else
            <span class="fan-order"></span>
        @endif
    @endfor
</div>

