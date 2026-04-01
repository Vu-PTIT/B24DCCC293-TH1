import { useMemo, useState } from 'react';
import { Card, Col, Empty, Rate, Row, Select, Slider, Tag } from 'antd';
import './components/style.less';

type DestinationType = 'bien' | 'nui' | 'thanhpho';

type Destination = {
	id: number;
	name: string;
	location: string;
	type: DestinationType;
	price: number;
	rating: number;
	reviewCount: number;
	image: string;
};

const DESTINATIONS: Destination[] = [
	{
		id: 1,
		name: 'Vinh Ha Long',
		location: 'Quang Ninh',
		type: 'bien',
		price: 1800000,
		rating: 4.8,
		reviewCount: 1240,
		image: 'https://images.unsplash.com/photo-1700851619125-f995f6e705bf?auto=format&fit=crop&w=1200&q=80',
	},
	{
		id: 2,
		name: 'Sapa',
		location: 'Lao Cai',
		type: 'nui',
		price: 2400000,
		rating: 4.7,
		reviewCount: 980,
		image: 'https://images.unsplash.com/photo-1552890678-f2cb4d005b02?auto=format&fit=crop&w=1200&q=80',
	},
	{
		id: 3,
		name: 'Da Nang',
		location: 'Da Nang',
		type: 'thanhpho',
		price: 2100000,
		rating: 4.6,
		reviewCount: 1670,
		image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80',
	},
	{
		id: 4,
		name: 'Nha Trang',
		location: 'Khanh Hoa',
		type: 'bien',
		price: 1950000,
		rating: 4.4,
		reviewCount: 840,
		image: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1200&q=80',
	},
	{
		id: 5,
		name: 'Da Lat',
		location: 'Lam Dong',
		type: 'nui',
		price: 1600000,
		rating: 4.5,
		reviewCount: 1120,
		image: 'https://images.unsplash.com/photo-1661961112951-f2bfd0d1f8f5?auto=format&fit=crop&w=1200&q=80',
	},
	{
		id: 6,
		name: 'Hoi An',
		location: 'Quang Nam',
		type: 'thanhpho',
		price: 1700000,
		rating: 4.9,
		reviewCount: 1430,
		image: 'https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?auto=format&fit=crop&w=1200&q=80',
	},
];

const TYPE_LABEL: Record<DestinationType, string> = {
	bien: 'Bien',
	nui: 'Nui',
	thanhpho: 'Thanh pho',
};

const SORT_OPTIONS = [
	{ label: 'Danh gia cao nhat', value: 'rating-desc' },
	{ label: 'Gia thap den cao', value: 'price-asc' },
	{ label: 'Gia cao den thap', value: 'price-desc' },
	{ label: 'Ten A-Z', value: 'name-asc' },
];

const formatCurrency = (amount: number) =>
	amount.toLocaleString('vi-VN', {
		style: 'currency',
		currency: 'VND',
		maximumFractionDigits: 0,
	});

const TrangChu = () => {
	const [typeFilter, setTypeFilter] = useState<DestinationType | 'all'>('all');
	const [maxPrice, setMaxPrice] = useState<number>(2500000);
	const [minRating, setMinRating] = useState<number>(0);
	const [sortBy, setSortBy] = useState<string>('rating-desc');

	const filteredDestinations = useMemo(() => {
		const result = DESTINATIONS.filter((destination) => {
			const matchesType = typeFilter === 'all' || destination.type === typeFilter;
			const matchesPrice = destination.price <= maxPrice;
			const matchesRating = destination.rating >= minRating;

			return matchesType && matchesPrice && matchesRating;
		});

		return result.sort((a, b) => {
			switch (sortBy) {
				case 'price-asc':
					return a.price - b.price;
				case 'price-desc':
					return b.price - a.price;
				case 'name-asc':
					return a.name.localeCompare(b.name, 'vi');
				default:
					return b.rating - a.rating;
			}
		});
	}, [typeFilter, maxPrice, minRating, sortBy]);

	return (
		<div className='destination-page'>
			<Card className='filter-card'>
				<div className='filter-grid'>
					<div className='filter-item'>
						<p className='filter-label'>Loai hinh</p>
						<Select
							value={typeFilter}
							onChange={(value) => setTypeFilter(value)}
							options={[
								{ label: 'Tat ca', value: 'all' },
								{ label: 'Bien', value: 'bien' },
								{ label: 'Nui', value: 'nui' },
								{ label: 'Thanh pho', value: 'thanhpho' },
							]}
						/>
					</div>

					<div className='filter-item'>
						<p className='filter-label'>Muc gia toi da</p>
						<Slider
							min={1000000}
							max={3000000}
							step={100000}
							value={maxPrice}
							onChange={(value) => {
								if (typeof value === 'number') {
									setMaxPrice(value);
								}
							}}
							tipFormatter={(value) => formatCurrency(value || 0)}
						/>
						<p className='filter-value'>{formatCurrency(maxPrice)}</p>
					</div>

					<div className='filter-item'>
						<p className='filter-label'>Danh gia toi thieu</p>
						<Slider
							min={0}
							max={5}
							step={0.5}
							value={minRating}
							onChange={(value) => {
								if (typeof value === 'number') {
									setMinRating(value);
								}
							}}
						/>
						<p className='filter-value'>{minRating.toFixed(1)} / 5</p>
					</div>

					<div className='filter-item'>
						<p className='filter-label'>Sap xep</p>
						<Select value={sortBy} onChange={(value) => setSortBy(value)} options={SORT_OPTIONS} />
					</div>
				</div>
			</Card>

			<Row gutter={[16, 16]}>
				{filteredDestinations.length === 0 && (
					<Col span={24}>
						<Card>
							<Empty description='Khong co diem den phu hop bo loc hien tai' />
						</Card>
					</Col>
				)}

				{filteredDestinations.map((destination) => (
					<Col key={destination.id} xs={24} sm={12} lg={8}>
						<Card
							hoverable
							cover={<img src={destination.image} alt={destination.name} className='destination-image' />}
							className='destination-card'
						>
							<div className='destination-header'>
								<h3>{destination.name}</h3>
								<Tag color='blue'>{TYPE_LABEL[destination.type]}</Tag>
							</div>
							<p className='destination-location'>{destination.location}</p>
							<div className='destination-rating'>
								<Rate allowHalf disabled value={destination.rating} />
								<span>
									{destination.rating.toFixed(1)} ({destination.reviewCount} danh gia)
								</span>
							</div>
							<p className='destination-price'>{formatCurrency(destination.price)} / nguoi</p>
						</Card>
					</Col>
				))}
			</Row>
		</div>
	);
};

export default TrangChu;
